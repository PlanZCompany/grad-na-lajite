export function validatePassword(password: string) {
  const validateFields = {
    hasUppercase: false,
    hasLowercase: false,
    has8Chars: false,
    hasNumber: false,
  }
  if (password.length >= 6) validateFields['has8Chars'] = true
  if (/[A-Z]/.test(password)) validateFields['hasUppercase'] = true
  if (/[a-z]/.test(password)) validateFields['hasLowercase'] = true
  if (/\d/.test(password)) validateFields['hasNumber'] = true

  return Object.values(validateFields).filter(Boolean).length === 0
    ? 'Password is valid!'
    : validateFields
}

export function checkPassword(password: string) {
  const validateFields = validatePassword(password)
  return validateFields
}
