import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lesson } from './lesson.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateLessonInput } from './input/create-lesson.input';
import { StudentToLessonInput } from './input/student-to-lesson.input';
import { StudentsService } from 'src/students/students.service';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>,
    ) {}

    async getLessons(): Promise<Lesson[]>{
        return this.lessonRepository.find();
    }

    async getLessonById(id: string): Promise<Lesson> {
        return this.lessonRepository.findOne({ id });
    }

    async createLesson(lessonInput: CreateLessonInput): Promise<Lesson> {
        const { name, startDate, endDate, students } = lessonInput;

        const lesson = this.lessonRepository.create({
            id: uuid(),
            name,
            startDate,
            endDate,
            students
        });

        return this.lessonRepository.save(lesson);
    }

    async assignStudentsToLesson(studentToLessonInput: StudentToLessonInput): Promise<Lesson> {
        const { lessonId, studentIds } = studentToLessonInput;
        const lesson = await this.lessonRepository.findOne({ id: lessonId });
        lesson.students = [...lesson.students, ...studentIds];
        
        return this.lessonRepository.save(lesson);
    }
}
