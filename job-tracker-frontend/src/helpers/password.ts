export const getPasswordStrength = (pass: string) => {
  if (!pass) return { strength: 0, label: '', color: '' }

  let strength = 0
  if (pass.length >= 8) strength++
  if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++
  if (pass.match(/[0-9]/)) strength++
  if (pass.match(/[^a-zA-Z0-9]/)) strength++

  if (strength <= 1) return { strength: 25, label: 'Weak', color: 'bg-red-500' }
  if (strength === 2) return { strength: 50, label: 'Fair', color: 'bg-orange-500' }
  if (strength === 3) return { strength: 75, label: 'Good', color: 'bg-yellow-500' }
  return { strength: 100, label: 'Strong', color: 'bg-green-500' }
}
