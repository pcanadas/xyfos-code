export interface Service {
  title: string;
  text: string;
  tech: string[];
  /** 24x24 stroke icon paths (Lucide style). */
  icon: string;
  example?: { label: string; href: string };
}

/** Services on the home (§01) and in the footer. Rows with a real example go first. */
export const services: Service[] = [
  {
    title: "Apps de escritorio",
    text: "Aplicaciones para Windows rápidas, fiables y con los datos en tu equipo, publicadas en Microsoft Store.",
    tech: ["Tauri", "Rust", "React"],
    example: { label: "Zenit para Windows", href: "/projects/zenit/#escritorio" },
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
  },
  {
    title: "Apps móviles",
    text: "Aplicaciones Android para el día a día: rápidas, sencillas y con los datos en el móvil, publicadas en Google Play.",
    tech: ["Android", "Tauri", "React"],
    example: { label: "Zenit para Android", href: "/projects/zenit/#android" },
    icon: '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
  },
  {
    title: "SaaS y aplicaciones web",
    text: "Plataformas multiusuario, paneles de gestión y CRMs adaptados a cómo trabaja tu equipo.",
    tech: ["Laravel", "Vue", "MySQL"],
    example: { label: "QuoteDesk", href: "/projects/quotedesk/" },
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  },
  {
    title: "Automatización e integraciones",
    text: "Conectar herramientas y eliminar tareas repetitivas: Google Calendar, Meet y Drive, formularios web y APIs de terceros.",
    tech: ["Python", "Selenium", "Google APIs"],
    icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
  },
  {
    title: "Datos y analítica",
    text: "Procesos ETL, web scraping y conectores para Power BI, para decidir con datos fiables.",
    tech: ["Pandas", "Power BI", "MySQL"],
    icon: '<path d="M3 3v18h18"/><path d="M7 16v-4M12 16V8M17 16v-7"/>',
  },
  {
    title: "Infraestructura cloud",
    text: "Despliegue y operación en AWS, con escalado automático, almacenamiento compartido y bases de datos MySQL.",
    tech: ["AWS EC2", "Auto Scaling", "EFS", "SSM"],
    icon: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z"/>',
  },
];
