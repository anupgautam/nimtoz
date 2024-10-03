import prisma from "./db"

const TestComponent = async () => {
    try {
        const categories = await prisma.category.findMany()
        console.log(categories)
    } catch (err) {
        console.log("Error fetching categories")
    }

    return (
        <div>TestComponent</div>
    )
}
export default TestComponent