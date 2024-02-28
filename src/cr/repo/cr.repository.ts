/* eslint-disable prettier/prettier */
import { EntityRepository, Repository } from "typeorm";
import { Cr } from "../entities/cr.entity";

@EntityRepository(Cr)
export class CrRepository extends Repository<Cr> {}