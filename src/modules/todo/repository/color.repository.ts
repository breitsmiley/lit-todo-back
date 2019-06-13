import { EntityRepository, Repository } from 'typeorm';
import { Color } from "../entity";

@EntityRepository(Color)
export class ColorRepository extends Repository<Color> {

}