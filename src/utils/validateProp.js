export function validateProp(types, required = false) {
  const acceptedTypes = Array.isArray(types) ? types : [types];
  return (props, name, component) => {
    const value = props[name];
    if (value == null && !required) return null;
    if (acceptedTypes.includes(typeof value)) return null;
    return new TypeError(
      `Prop "${name}" inválida em ${component}; esperado: ${acceptedTypes.join(', ')}.`,
    );
  };
}
