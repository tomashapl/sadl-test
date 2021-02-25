const parseValidationErrors = (errors: string[]) =>
  Object.values(errors)
    .map((error: string) => {
      const [_field, field] = error.match(/"(.*)"/);
      return {
        [field]: error,
      };
    })
    .reduce(
      (acc, cur) => ({
        ...acc,
        ...cur,
      }),
      {}
    );

export default parseValidationErrors;
