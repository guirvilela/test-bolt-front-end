export function parseIso(date: string) {
  return new Date(date).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo", // Ajuste para o seu fuso horário
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
