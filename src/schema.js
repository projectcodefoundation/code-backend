import { nexusPrismaPlugin } from 'nexus-prisma';
import { idArg, makeSchema, objectType, stringArg } from 'nexus';

const User = objectType({
    name: 'User',
    definition(t) {
        t.model.id()
        t.model.name()
        t.model.email()
        t.model.bio()
    },
})

const Course = objectType({
    name: 'Course',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.sections()
    },
})

const Section = objectType({
    name: 'Section',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.lessons()
    },
})

const Lesson = objectType({
    name: 'Lesson',
    definition(t) {
        t.model.id()
        t.model.title()
        t.model.blocks()
    },
})

const Block = objectType({
    name: 'Block',
    definition(t) {
        t.model.id()
        t.model.type()
        t.model.lang()
        t.model.source()
    },
})

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.crud.user()
        t.crud.users()

        t.crud.course()
        t.crud.courses()
    },
})

const Mutation = objectType({
    name: 'Mutation',
    definition(t) {
        t.crud.createOneUser()
        t.crud.updateOneUser()
        t.crud.deleteOneUser()

        t.crud.createOneCourse()
        t.crud.updateOneCourse()
        t.crud.deleteOneCourse()

        t.crud.createOneSection()
        t.crud.updateOneSection()
        t.crud.deleteOneSection()

        t.crud.createOneLesson()
        t.crud.updateOneLesson()
        t.crud.deleteOneLesson()
    },
})

export const schema = makeSchema({
    types: [Query, Mutation, User, Course, Section, Lesson, Block],
    plugins: [nexusPrismaPlugin()],
    outputs: {
        schema: __dirname + '/generated/schema.graphql',
        typegen: __dirname + '/generated/nexus.ts',
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'prisma',
            },
            {
                source: require.resolve('./context'),
                alias: 'Context',
            },
        ],
    },
})
