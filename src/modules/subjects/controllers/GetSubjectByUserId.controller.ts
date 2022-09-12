import { Request, Response } from 'express';
import { transformAndValidate } from 'infra/http/errors/transformAndValidate';
import { container } from 'tsyringe';
import { GetSubjectByUserIdDTO } from '../dtos/GetSubjectByUserId.dto';
import { GetSubjectByUserIdService } from '../services/GetSubjectByUserId.service';

export class GetSubjectByUserIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const GetSubjectByUserIdDto = await transformAndValidate(GetSubjectByUserIdDTO, { id });

    const subjects = await container.resolve(GetSubjectByUserIdService).execute(GetSubjectByUserIdDto);

    return response.json(subjects).send();
  }
}
