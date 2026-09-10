'use client';

import { PROCESS, SERVICES } from '@/config/services';
import { track } from '@/lib/tracking';
import { IconArrowRight, ICONS, type IconKey } from './Icons';
import { SectionHead } from './Sections';

/** Diffusé pour que le formulaire présélectionne le bon service. */
export const SELECT_SERVICE_EVENT = 'gea:select-service';

export default function Services() {
  const requestService = (formValue: string, title: string) => {
    window.dispatchEvent(
      new CustomEvent(SELECT_SERVICE_EVENT, { detail: formValue }),
    );
    track(
      formValue.includes('Audit') ? 'audit_request' : 'consulting_request',
      { service: title, location: 'services' },
    );
  };

  return (
    <>
      <section className="section section--bordered" id="services">
        <div className="container">
          <SectionHead
            eyebrow="Services"
            title="Mes services"
            intro="Chaque mission commence par des faits et se termine par quelque chose qui tourne. Pas un deck de 60 slides que personne n’ouvre deux fois."
            center
          />

          <div className="grid grid--3">
            {SERVICES.map((service) => {
              const Icon = ICONS[(service.icon as IconKey) ?? 'system'];
              return (
                <article className="service reveal" key={service.id}>
                  <span className="service__icon">
                    <Icon size={20} />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul className="service__deliverables">
                    {service.deliverables.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                  <a
                    className="service__cta"
                    href="#contact"
                    onClick={() => requestService(service.formValue, service.title)}
                  >
                    Demander ce service
                    <IconArrowRight size={15} />
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--panel" id="how-i-work">
        <div className="container">
          <SectionHead
            eyebrow="Ma méthode"
            title="Cinq étapes, dans cet ordre, à chaque fois"
            intro="L’ordre compte. Concevoir un système avant d’auditer l’existant, c’est la meilleure façon d’automatiser plus vite un processus cassé."
          />

          <div className="steps">
            {PROCESS.map((step) => (
              <div className="step reveal" key={step.step}>
                <span className="step__dot">{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
