import prisma from "./db"

const TestComponent = async () => {
    try {
        const categories = await prisma.category.findMany()
    } catch (err) {
    }

    return (
        <div>TestComponent</div>
    )
}
export default TestComponent