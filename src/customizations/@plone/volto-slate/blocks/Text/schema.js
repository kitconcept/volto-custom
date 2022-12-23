// Remove all schema from volto-slate
// leave it empty
const TextBlockSchema = (data) => {
  return {
    title: '',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
    ],
    properties: {},
    required: [],
  };
};

export default TextBlockSchema;
