export function length({ min, max }) {
  return function (value) {
      const result = Boolean(value.length >= min && value.length <= max);
      return {
          valid: result,
          message: result ? undefined : `This field must be between ${min} and ${max}`
      };
  };
}
export const required = (value) => {
  const result = Boolean(value);
  return {
      valid: result,
      message: result ? undefined : 'This field is required'
  };
};
export function validate(value, rules) {
  for (const rule of rules) {
      const result = rule(value);
      if (!result.valid) {
          return result;
      }
  }
  return {
      valid: true
  };
}