import type { Metadata } from 'next';
import { Footer } from '@/components/Closing';
import Nav from '@/components/Nav';
import { links, site } from '@/config/site';

export const metadata: Metadata = {
  title: 'Conditions d’utilisation',
  description:
    'Conditions d’utilisation du site de Mr GUEHEDI Emmanuel, spécialiste marketing digital et automatisation IA.',
};

const UPDATED = '10 septembre 2026';

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main id="main" className="section" style={{ paddingTop: 'calc(var(--nav-h) + 4rem)' }}>
        <div className="container prose">
          <h1>Conditions d’utilisation</h1>
          <p className="muted">Dernière mise à jour : {UPDATED}</p>

          <h2>1. Éditeur du site</h2>
          <p>
            Ce site est édité par {site.name}, {site.role}, {site.location.label}.
            Contact : <a href={links.mailto}>{site.email}</a> ·{' '}
            <a href={links.tel}>{site.phone.display}</a>.
          </p>

          <h2>2. Objet du site</h2>
          <p>
            Ce site présente mon expertise professionnelle et mes services, et vous permet
            de demander un audit ou une consultation. L’envoi du formulaire ne crée aucun
            contrat : il ouvre une conversation. Toute mission est encadrée par une
            proposition écrite distincte.
          </p>

          <h2>3. Informations tarifaires</h2>
          <p>
            La section tarifs répertorie les prix de logiciels tiers publiés par leurs
            éditeurs respectifs, accompagnés de la date de vérification de chaque montant
            et d’un lien vers la page tarifaire officielle correspondante. Ces éditeurs
            modifient leurs prix sans préavis, les tarifs varient selon la région, le
            volume de contacts, le nombre de sièges et la négociation, et les conversions
            de devises utilisent des taux indicatifs que vous pouvez modifier sur la page.
          </p>
          <p>
            Ces chiffres sont fournis à titre d’orientation uniquement. Ils ne constituent
            ni une offre, ni un devis, ni une garantie du prix qui vous sera facturé par
            un éditeur. Confirmez toujours sur la page tarifaire officielle de l’éditeur
            avant toute décision d’achat. Les marques et noms de produits appartiennent à
            leurs détenteurs respectifs ; leur mention ici n’implique aucun partenariat ni
            aucune approbation.
          </p>

          <h2>4. Propriété intellectuelle</h2>
          <p>
            La structure, les textes, l’identité visuelle, les schémas et les cadres
            méthodologiques présentés sur ce site sont mon travail et sont protégés. Vous
            pouvez les citer avec attribution ; vous ne pouvez pas reproduire le site ou
            des parties substantielles de celui-ci à des fins commerciales sans
            autorisation écrite.
          </p>

          <h2>5. Responsabilité</h2>
          <p>
            Le contenu de ce site est fourni à titre informatif. Je m’efforce de le
            maintenir exact et à jour, mais je ne garantis ni son exhaustivité ni son
            absence d’erreur, et je ne saurais être tenu responsable des décisions prises
            sur cette seule base. Les recommandations formulées dans le cadre d’une
            mission rémunérée sont régies par les conditions propres à cette mission.
          </p>

          <h2>6. Liens externes</h2>
          <p>
            Ce site renvoie vers des sites tiers, principalement des pages tarifaires
            d’éditeurs. Je n’ai aucun contrôle sur leur contenu et n’en assume aucune
            responsabilité.
          </p>

          <h2>7. Données personnelles</h2>
          <p>
            Le traitement des données personnelles est décrit dans la{' '}
            <a href="/privacy">politique de confidentialité</a>.
          </p>

          <h2>8. Droit applicable</h2>
          <p>
            Les présentes conditions sont régies par le droit marocain. Tout litige sera
            porté devant les tribunaux compétents de Casablanca, sauf disposition
            impérative contraire.
          </p>

          <p style={{ marginTop: '2.5rem' }}>
            <a className="btn btn--ghost" href="/">
              ← Retour au site
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
