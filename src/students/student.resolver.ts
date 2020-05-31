import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { StudentType } from "./student.type";
import { StudentsService } from "./students.service";
import { Student } from "./student.entity";
import { CreateStudentInput } from "./inputs/create-students.input";

@Resolver(of => StudentType)
export class StudentResolver{
    constructor(
        private studentService: StudentsService
    ){}

    @Query(returns => [StudentType])
    students(): Promise<Student[]> {
        return this.studentService.getStudents();
    }

    @Query(returns => StudentType)
    student(
        @Args('id') id: string 
    ): Promise<Student> {
        return this.studentService.getStudent(id);
    }

    @Mutation(returns => StudentType)
    createStudent(
        @Args('CreateStudentInput') createStudentInput: CreateStudentInput
    ) {
        return this.studentService.createStudent(createStudentInput);
    }
}