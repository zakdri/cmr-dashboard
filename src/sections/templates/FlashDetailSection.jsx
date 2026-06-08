import React from 'react';
import HtmlBlock from '../../components/HtmlBlock.jsx';

const html = "<div id=\"view-flash-detail\" class=\"view-section km-container\">\n                <button class=\"actu-back-btn\" onclick=\"switchView(flashDetailBackView || 'dashboard')\">\n                    <i data-lucide=\"arrow-left\" style=\"width:16px;height:16px;\"></i>\n                    Retour à l'accueil\n                </button>\n                <div class=\"actu-detail-card\" id=\"flashDetailContent\">\n                    <!-- Injected by JS -->\n                </div>\n            </div>\n            <!-- ===== END FLASH INFO DETAIL VIEW ===== -->\n\n            <!-- ===== DG MESSAGE DETAIL VIEW ===== -->\n";

export default function FlashDetailSection() {
  return <HtmlBlock html={html} />;
}
