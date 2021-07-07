import { SchemaDirectiveVisitor } from 'apollo-server-express';

class inherits extends SchemaDirectiveVisitor {
  visitObject(object) {
    const fields = object.getFields();
    const type = this.schema.getTypeMap()[this.args.type];

    Object.entries(type.getFields()).forEach(([name, field]) => {
      if (fields[name] === undefined) {
        fields[name] = { ...field };
      }
    });
  }
}

export default inherits;
