import ExtendedException from './Exceptions';

export class SchemaValidationException extends ExtendedException {
    public code = 1000
}

export default SchemaValidationException;