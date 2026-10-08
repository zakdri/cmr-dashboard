import React, { useState } from "react";
import { icons } from "lucide";
import { AUTH_STATUS } from "../../services/moovappsPlatform.js";

function LoginIcon({ name }) {
  const icon = icons[name] || [];
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icon.map(([tag, attributes], index) => React.createElement(tag, { ...attributes, key: `${tag}-${index}` }))}
    </svg>
  );
}

export default function LoginView({ twoFactorEnabled, onLogin }) {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting || twoFactorEnabled) return;
    if (!login.trim() || !password) {
      setError("Renseignez votre identifiant et votre mot de passe.");
      return;
    }
    setSubmitting(true);
    setError("");
    const result = await onLogin(login.trim(), password);
    if (!result?.ok) {
      if (result?.status === AUTH_STATUS.ACCOUNT_LOCKED) setError("Votre compte est verrouillé. Contactez votre administrateur.");
      else if (result?.status === AUTH_STATUS.INVALID_CREDENTIALS) setError("Identifiant ou mot de passe incorrect.");
      else setError("Connexion impossible. Vérifiez l'accès au serveur Moovapps.");
      setPassword("");
    }
    setSubmitting(false);
  }

  return (
    <main className="login-page">
      <div className="login-shell">
        <section className="login-identity" aria-label="Caisse Marocaine des Retraites">
          <img className="login-logo" src="images/intranet/cmr-logo-login.png" alt="Caisse Marocaine des Retraites" />
          <div className="login-identity-copy">
            <h2>Votre <strong>portail intranet</strong></h2>
            <p>Retrouvez votre environnement<br />de travail et les services de la CMR.</p>
          </div>
        </section>

        <section className="login-panel" aria-labelledby="login-title">
          <div className="login-form-wrap">
            <span className="login-space-title">Espace collaborateur</span>
            <span className="login-eyebrow">Accès sécurisé</span>
            <h1 id="login-title">Bienvenue</h1>
            <p className="login-intro">Connectez-vous avec votre compte.</p>
            {twoFactorEnabled ? (
              <div className="login-alert" role="alert">
                L'authentification à deux facteurs est activée. Utilisez la page de connexion Moovapps ou contactez votre administrateur.
              </div>
            ) : null}
            <form onSubmit={handleSubmit} className="login-form">
              <label htmlFor="cmr-login">Identifiant</label>
              <div className="login-input-field">
                <span className="login-input-icon"><LoginIcon name="UserRound" /></span>
                <input id="cmr-login" value={login} onChange={(event) => setLogin(event.target.value)} autoComplete="username" aria-label="Identifiant" disabled={submitting || twoFactorEnabled} />
              </div>
              <label htmlFor="cmr-password">Mot de passe</label>
              <div className="login-input-field login-password-field">
                <span className="login-input-icon"><LoginIcon name="LockKeyhole" /></span>
                <input id="cmr-password" type={passwordVisible ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" aria-label="Mot de passe" disabled={submitting || twoFactorEnabled} />
                <button
                  type="button"
                  className="login-password-toggle"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  disabled={submitting || twoFactorEnabled}
                  aria-label={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                  aria-pressed={passwordVisible}
                  title={passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  <LoginIcon name={passwordVisible ? "EyeOff" : "Eye"} />
                </button>
              </div>
              {error ? <div className="login-error" role="alert">{error}</div> : null}
              <button type="submit" className="primary-btn login-submit" disabled={submitting || twoFactorEnabled}>
                <span>{submitting ? "Connexion..." : "Se connecter"}</span>
                <LoginIcon name="ArrowRight" />
              </button>
            </form>
            <p className="login-help"><LoginIcon name="Headphones" /><span>En cas de difficulté, contactez le <strong>Support SI</strong>.</span></p>
          </div>
        </section>
      </div>
    </main>
  );
}
