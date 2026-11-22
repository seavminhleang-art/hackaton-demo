import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import DashboardApp from "../../DashboardApp";

const serviceModules = {
  "lost-found": "lost-found",
  "city-reports": "city-reports",
  emergency: "emergency",
  community: "community-services",
} as const;

type ServiceSlug = keyof typeof serviceModules;

export function generateStaticParams() {
  return Object.keys(serviceModules).map((slug) => ({ slug }));
}

export default function ServicePage({ params }: PageProps<"/services/[slug]">) {
  return (
    <Suspense fallback={<ServiceFallback />}>
      <ServiceContent params={params} />
    </Suspense>
  );
}

async function ServiceContent({
  params,
}: Pick<PageProps<"/services/[slug]">, "params">) {
  const { slug } = await params;
  if (!Object.hasOwn(serviceModules, slug)) notFound();
  return (
    <DashboardApp
      module={serviceModules[slug as ServiceSlug]}
      requireAuth={false}
      standalone
    />
  );
}

function ServiceFallback() {
  return (
    <main className="app-shell service-shell">
      <section className="main-area">
        <header className="topbar">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <b>Community service</b>
          </div>
          <nav className="service-top-nav" aria-label="Service pages">
            <Link href="/about">About</Link>
            <Link href="/services/lost-found">Lost &amp; Found</Link>
            <Link href="/services/city-reports">Government reports</Link>
            <Link href="/services/emergency">Emergency contact</Link>
            <Link href="/services/community">Community &amp; services</Link>
          </nav>
        </header>
        <div className="content">
          <div className="service-loading">
            <span className="service-loading-mark" />
            <span className="service-loading-title" />
            <span className="service-loading-copy" />
            <div>
              <i />
              <i />
              <i />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
