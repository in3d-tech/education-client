export function t(id: string) {
  const texts: object = {
    teacherPortal: "פורטל מורים",
    studentPortal: "פורטל תלמידים",
  };

  return (texts as Record<string, string>)[id] || null;
}
