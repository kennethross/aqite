import { ApiResponseSchemaHost } from "@nestjs/swagger";

type Schema = ApiResponseSchemaHost["schema"];

function generateApiSchema(value: {
  code: number;
  data?: Schema;
  error?: Schema;
}): Schema {
  const { code } = value;
  return {
    type: 'object',
    properties: {
      ...value,
      code: {
        type: 'integer',
        enum: [code],
        example: code,
      },
    },
  }
}

export function generateApiOkSchema(schema:  Schema): Schema {
  return generateApiSchema({
    code: 200,
    data: schema,
  });
}

export function generateApiCreatedSchema(schema: Schema): Schema {
  return generateApiSchema({
    code: 201,
    data: schema,
  });
}

export function generateApiUnprocessableEntitySchema(schema: Schema): Schema {
  return generateApiSchema({
    code: 422,
    error: schema,
  });
}