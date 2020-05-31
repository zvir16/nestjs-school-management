import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Student
        ])
    ],
    exports: [
        StudentsService
    ],
    providers: [
        StudentsService,
        StudentResolver
    ]
})
export class StudentsModule {}
