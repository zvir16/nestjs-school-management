import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Student } from './student.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStudentInput } from './inputs/create-students.input';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ){}

    async getStudents() {
        return this.studentRepository.find();
    }

    async getStudent(id: string) {
        return this.studentRepository.findOne({ id });
    }

    async createStudent(createStudentInput: CreateStudentInput): Promise<Student> {
        const { firstname, lastname } = createStudentInput;
        const student = this.studentRepository.create({
            id: uuid(),
            firstname,
            lastname
        });

        return this.studentRepository.save(student);
    }

    async getManyStudents(studentIds: string[]): Promise<Student[]> {
        return this.studentRepository.find({
            where: {
                id: {
                    $in: studentIds,
                }
            }
        })

    }
}
