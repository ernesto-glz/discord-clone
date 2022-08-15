import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response, Request } from 'express';
import { Errors } from 'src/constants/errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status: HttpStatus;
    let errorMessage: string;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse = exception.getResponse();
      errorMessage = (errorResponse as any).message ?? exception.message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      errorMessage = 'Critical internal server error occurred!';
    }

    const errorResponse = this.getErrorResponse(status, errorMessage, request);
    response.status(status).json(errorResponse);
  }

  private getErrorResponse(status: HttpStatus, errorMessage: string, request: Request) {
    return {
      statusCode: status,
      errors: this.modifyError(errorMessage),
      path: request.url,
      method: request.method
    };
  }

  private modifyError(err: string | string[]) {
    if (Array.isArray(err))
      return err.map((e) => {
        return { code: this.getErrorCode(e), message: e };
      });

    return [{ code: 'GENERIC', message: err }];
  }

  private getErrorCode(error: string): string {
    const errorsObject = {};
    const errorsArray = Array.from(Object.entries(Errors)).map(([k, v]) => v);
    Object.assign(errorsObject, ...errorsArray);

    const codeFound = this.findCodeInObject(errorsObject, error);
    if (!codeFound) return 'UNKNOWN_CODE';
    return codeFound;
  }

  private findCodeInObject(object: Object, sarchVal: string) {
    return Object.entries(object)
      .filter(([, value]) => value === sarchVal)
      .map(([key]) => key)[0];
  }
}
