import { Module } from '@nestjs/common';
import { Lesson } from './lesson/lesson.entity';
import { Student } from './students/student.entity';
import { LessonModule } from './lesson/lesson.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { StudentsModule } from './students/students.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/school',
      useUnifiedTopology: true,
      synchronize: true,
      entities: [
        Lesson,
        Student,
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true
    }),
    LessonModule,
    StudentsModule
  ]

})
export class AppModule {}
