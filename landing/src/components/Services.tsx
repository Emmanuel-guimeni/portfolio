'use client';

import type { Dictionary } from '@/i18n/types';
import { track } from '@/lib/tracking';
import { IconArrowRight, ICONS, type IconKey } from './Icons';
import { SectionHead } from './Primitives';

/** Diffusé pour que le formulaire présélectionne le bon service. */
export const SELECT_SERVICE_EVENT = 'gea:select-service';

export default function Services({ d }: { d: Dictionary }) {
  const requestService = (formValue: string, title: string) => {
    window.dispatchEvent(
      new CustomEvent(SELECT_SERVICE_EVENT, { detail: formValue }),
    );
    track(
      formValue.includes('audit') ? 'audit_request' : 'consulting_request',
      { service: title, location: 'services' },
    );
  };

  return (
    <>
      <section className="section section--bordered" id="services">
        <div className="container">
          <SectionHead
            eyebrow={d.services.eyebrow}
            title={d.services.title}
            intro={d.services.intro}
            center
          />

          <div className="grid grid--3">
            {d.services.list.map((service) => {
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
                    {d.services.cta}
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
            eyebrow={d.process.eyebrow}
            title={d.process.title}
            intro={d.process.intro}
          />

          <div className="steps">
            {d.process.steps.map((step) => (
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
