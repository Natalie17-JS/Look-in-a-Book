import { GraphQLScalarType, Kind, ValueNode } from "graphql";

export const DateTime = new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date-time value",
    serialize(value: unknown): string {
      if (!(value instanceof Date)) {
        throw new TypeError("Value is not an instance of Date");
      }
      return value.toISOString();
    },
    parseValue(value: unknown): Date {
      if (typeof value !== "string") {
        throw new TypeError("Value is not a valid ISO string");
      }
      return new Date(value);
    },
    parseLiteral(ast: ValueNode): Date | null {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  });
  