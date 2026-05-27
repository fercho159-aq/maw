// La metadata de esta ruta ahora vive en src/lib/landing-data.ts y se exporta
// desde page.tsx vía buildMetadata("apps").
export default function AppsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
