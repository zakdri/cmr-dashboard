import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  applyCurrentUser,
  getCurrentUser,
  isDemoMode,
  resolvePlatformAssetUrl,
  updateCurrentUser,
  userInitials,
} from "../../services/moovappsPlatform.js";

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024;

function emptyForm() {
  return { firstName: "", lastName: "", lang: "fr", oldPassword: "", newPassword: "", confirmPassword: "" };
}

async function readAvatarBase64(source) {
  if (!source) return "";
  if (source.startsWith("data:")) return source.split(",")[1] || "";
  try {
    const response = await fetch(source, { credentials: "include" });
    if (!response.ok) return undefined;
    const blob = await response.blob();
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
    return dataUrl.split(",")[1] || "";
  } catch {
    return undefined;
  }
}

export default function ProfileSection() {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [avatar, setAvatar] = useState("");
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  const loadProfile = useCallback(async () => {
    setStatus("loading");
    let currentUser;
    if (isDemoMode()) {
      const demoHeaderUser = window.CMR_DATA?.data?.header?.user || {};
      const nameParts = String(demoHeaderUser.name || "Utilisateur Démo").trim().split(/\s+/);
      currentUser = {
        login: "demo",
        firstName: nameParts.shift() || "Utilisateur",
        lastName: nameParts.join(" ") || "Démo",
        fullName: demoHeaderUser.name || "Utilisateur Démo",
        email: "demo@cmr.local",
        function: "Profil de démonstration",
        lang: "fr",
        avatar: demoHeaderUser.avatarUrl || "",
      };
    } else {
      currentUser = await getCurrentUser();
    }
    if (!currentUser) {
      setStatus("error");
      return;
    }
    setUser(currentUser);
    setForm({
      ...emptyForm(),
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      lang: currentUser.lang || "fr",
    });
    setAvatar(resolvePlatformAssetUrl(currentUser.avatar));
    setAvatarChanged(false);
    setStatus("ready");
  }, []);

  useEffect(() => {
    loadProfile();
    window.addEventListener("cmr:profile-open", loadProfile);
    return () => window.removeEventListener("cmr:profile-open", loadProfile);
  }, [loadProfile]);

  function changeField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function selectAvatar(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setMessage("Sélectionnez une image JPEG, PNG ou WebP.");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      setMessage("La photo ne doit pas dépasser 5 Mo.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(String(reader.result));
      setAvatarChanged(true);
      setMessage("");
    };
    reader.onerror = () => setMessage("La photo n'a pas pu être lue.");
    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    if (form.firstName.trim().length < 2 || form.lastName.trim().length < 2) {
      setMessage("Le prénom et le nom sont requis.");
      return;
    }
    const changingPassword = form.oldPassword || form.newPassword || form.confirmPassword;
    if (changingPassword && (!form.oldPassword || form.newPassword.length < 12 || form.newPassword !== form.confirmPassword)) {
      setMessage("Pour modifier le mot de passe, renseignez l'ancien mot de passe et confirmez un nouveau mot de passe d'au moins 12 caractères.");
      return;
    }
    setStatus("saving");
    try {
      const avatarPayload = avatarChanged ? avatar : await readAvatarBase64(avatar);
      const updated = isDemoMode()
        ? {
          ...user,
          ...form,
          fullName: `${form.firstName} ${form.lastName}`.trim(),
          ...(avatarChanged ? { avatar } : {}),
        }
        : await updateCurrentUser({
          login: user.login,
          ...form,
          ...(avatarPayload !== undefined ? { avatar: avatarPayload } : {}),
        });
      if (updated) {
        setUser(updated);
        applyCurrentUser(updated);
      }
      setForm((current) => ({ ...current, oldPassword: "", newPassword: "", confirmPassword: "" }));
      setAvatarChanged(false);
      setMessage("Profil enregistré.");
      setStatus("ready");
      if (changingPassword) window.setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage(error?.message || "La mise à jour du profil a échoué.");
      setStatus("ready");
    }
  }

  return (
    <section id="view-profile" className="view-section profile-page">
      <div className="profile-page-header">
        <div className="card-icon blue"><i data-lucide="user" /></div>
        <div><h2>Mon Profil</h2><p>Gérez vos informations personnelles et vos paramètres de connexion.</p></div>
      </div>
      {status === "error" ? <div className="profile-card profile-card-state">Profil Moovapps indisponible.</div> : null}
      {status !== "error" ? (
        <form className="profile-card" onSubmit={handleSubmit}>
          <div className="profile-avatar-block">
            <div className="profile-avatar-wrap">
              <div className="profile-avatar">
                {avatar ? <img src={avatar} alt="Photo de profil" /> : userInitials({ ...user, ...form })}
              </div>
              <button type="button" className="profile-avatar-btn change" title="Changer la photo" onClick={() => inputRef.current?.click()}><i data-lucide="camera" /></button>
              <button type="button" className="profile-avatar-btn remove" title="Supprimer la photo" onClick={() => { setAvatar(""); setAvatarChanged(true); }}><i data-lucide="trash-2" /></button>
              <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp" hidden onChange={selectAvatar} />
            </div>
            <div className="profile-identity">
              <div className="profile-fullname">{`${form.firstName} ${form.lastName}`.trim() || "Utilisateur"}</div>
              <div className="profile-meta">{user?.function || user?.login || ""}</div>
              {user?.email ? <div className="profile-meta">{user.email}</div> : null}
            </div>
          </div>
          <div className="profile-grid-2">
            <div className="profile-field"><label htmlFor="profile-first-name">Prénom</label><input id="profile-first-name" name="firstName" value={form.firstName} onChange={changeField} /></div>
            <div className="profile-field"><label htmlFor="profile-last-name">Nom</label><input id="profile-last-name" name="lastName" value={form.lastName} onChange={changeField} /></div>
          </div>
          <div className="profile-grid-2">
            <div className="profile-field"><label htmlFor="profile-login">Identifiant</label><input id="profile-login" className="profile-readonly" value={user?.login || ""} readOnly /></div>
            <div className="profile-field"><label htmlFor="profile-language">Langue</label><select id="profile-language" name="lang" value={form.lang} onChange={changeField}><option value="fr">Français</option><option value="en">English</option></select></div>
          </div>
          <h3 className="profile-subtitle">Modifier le mot de passe</h3>
          <div className="profile-grid-3">
            <div className="profile-field"><label htmlFor="profile-old-password">Ancien mot de passe</label><input id="profile-old-password" name="oldPassword" type="password" autoComplete="current-password" value={form.oldPassword} onChange={changeField} /></div>
            <div className="profile-field"><label htmlFor="profile-new-password">Nouveau mot de passe</label><input id="profile-new-password" name="newPassword" type="password" autoComplete="new-password" value={form.newPassword} onChange={changeField} /></div>
            <div className="profile-field"><label htmlFor="profile-confirm-password">Confirmation</label><input id="profile-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" value={form.confirmPassword} onChange={changeField} /></div>
          </div>
          {message ? <div className={message === "Profil enregistré." ? "profile-success" : "profile-error"}>{message}</div> : null}
          <div className="profile-actions"><button type="button" className="secondary-btn" onClick={loadProfile}>Annuler</button><button type="submit" className="primary-btn" disabled={status === "saving"}>{status === "saving" ? "Enregistrement..." : "Enregistrer"}</button></div>
        </form>
      ) : null}
    </section>
  );
}
