import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";

@InputType()
export class CreateStudentInput {
    @MinLength(4)
    @Field()
    firstname: string;

    @MinLength(4)
    @Field()
    lastname: string;
}