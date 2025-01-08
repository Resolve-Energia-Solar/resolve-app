export function formatDate(input) {
    if (!input || input === "Data não definida") {
      return "Data não disponível"; // Valor padrão para campos nulos ou indefinidos
    }
  
    const date = new Date(input);
  
    if (isNaN(date.getTime())) {
      return "Data inválida";
    }
  
    const monthNames = [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = monthNames[date.getMonth()]; 
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
  
    return input.includes("T")
      ? `${day} de ${month} de ${year}, às ${hours}:${minutes}`
      : `${day} de ${month} de ${year}`;
  }
  