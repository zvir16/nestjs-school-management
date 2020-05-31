import { Resolver,Query, Mutation, Args, ResolveField, Parent  } from "@nestjs/graphql";
import { Lesson } from "./lesson.entity";
import { LessonType } from "./lesson.type";
import { LessonService } from "./lesson.service";
import { StudentsService } from "../students/students.service";
import { CreateLessonInput } from "./input/create-lesson.input";
import { StudentToLessonInput } from "./input/student-to-lesson.input";

@Resolver(of => LessonType)
export class LessonResolver {

    constructor(
        private lessonService: LessonService,
        private studentsService: StudentsService,
    ) {

    }
    @Query(returns => LessonType)
    lesson(
        @Args('id') id: string
    ): Promise<Lesson> {
        return this.lessonService.getLessonById(id);
    }

    @Query(returns => [LessonType])
    lessons(): Promise<Lesson[]> {
        return this.lessonService.getLessons();
    }

    @Mutation(returns => LessonType)
    createLesson(
       @Args('lesson') lesson: CreateLessonInput
    ): Promise<Lesson> {
        return this.lessonService.createLesson(lesson);
    }

    @Mutation(returns => LessonType)
    assignStudent(
        @Args('studentsToLessonInput') studentsToLessonInput: StudentToLessonInput
    ): Promise<Lesson> {
        return this.lessonService.assignStudentsToLesson(studentsToLessonInput);

    }

    @ResolveField()
    async students(@Parent() lesson: Lesson) {
        return this.studentsService.getManyStudents(lesson.students);
        
    }
   
}