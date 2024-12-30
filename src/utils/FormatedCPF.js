export const FormatCPF = cpf => {
  if (!cpf || cpf.length !== 11) {
    return cpf
  }
  return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(
    9,
    11
  )}`
}
