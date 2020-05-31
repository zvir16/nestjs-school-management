import { Module } from '@nestjs/common';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentsModule } from 'src/students/students.module';
import { LessonResolver } from './lesson.resolver';

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forFeature([
      Lesson
    ]),
  ],
  providers: [LessonService, LessonResolver]
})
export class LessonModule {}
