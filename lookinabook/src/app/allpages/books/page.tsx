import Books from "./components/AllBooks"
import Link from "next/link"

export default function BooksPage() {

    return (  
    <div>
       
        <Books />
        <Link href="/">
        <button>Back to homepage</button>
        </Link>
    </div>
    ) 
}