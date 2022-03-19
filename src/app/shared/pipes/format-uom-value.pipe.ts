import { Pipe, PipeTransform } from '@angular/core'
import { UnitOfMeasure } from '@state/exercises'
import { fromBaseUnitToFormattedUom, roundToTwo } from '@shared/utils/formatting'

@Pipe({ name: 'formatUomValue' })
export class FormatUomValuePipe implements PipeTransform {
  transform(value: number, unitOfMeasure?: UnitOfMeasure) {
    if (!unitOfMeasure) return value

    return roundToTwo(fromBaseUnitToFormattedUom(value, unitOfMeasure))
  }
}
