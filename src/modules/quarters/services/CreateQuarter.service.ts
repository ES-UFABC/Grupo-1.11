import { AppError } from 'infra/http/errors/AppError';
import { DateService } from 'infra/services/DateService';
import { PrismaAcademicYearRepository } from 'modules/academicYears/repositories/prisma/PrismaAcademicYearRepository';
import { createQuarterDTO } from '../dtos/CreateQuarter.dto.';
import { PrismaQuarterRepository } from '../repositories/prisma/PrismaQuarterRepository';
import { singleton } from 'tsyringe';

@singleton()
export class CreateQuarterService {
  constructor(
    private quarterRepository: PrismaQuarterRepository,
    private academicYearRepository: PrismaAcademicYearRepository,
    private dateService: DateService,
  ) {}

  async execute(params: createQuarterDTO) {
    const { academicYearId, startDate, endDate } = params;
    const startDateUTC = this.dateService.toDate(startDate);
    const endDateUTC = this.dateService.toDate(endDate);

    if (!(await this.academicYearRepository.exists(academicYearId))) {
      throw new AppError('Ano acadêmico não existe');
    }

    if (this.dateService.compareIfBefore(startDateUTC, endDateUTC)) {
      throw new AppError('Data final é antes da data inicial');
    }

    await this.quarterRepository.createQuarter({
      academyYearId: academicYearId,
      startDate: startDateUTC,
      endDate: endDateUTC,
    });
  }
}
