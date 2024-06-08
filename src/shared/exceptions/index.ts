import {
  HttpException,
  HttpExceptionOptions,
  HttpStatus,
} from '@nestjs/common';

export class DomainException extends HttpException {}

export class UnauthorizedException extends DomainException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.UNAUTHORIZED, options);
  }
}

export class ForbiddenException extends DomainException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.FORBIDDEN, options);
  }
}

export class BadRequestException extends DomainException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.BAD_REQUEST, options);
  }
}

export class NotFoundException extends DomainException {
  constructor(message: string, options?: HttpExceptionOptions) {
    super(message, HttpStatus.NOT_FOUND, options);
  }
}
