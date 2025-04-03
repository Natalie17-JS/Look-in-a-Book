import Door from "@/app/allpages/profile/profileComponents/GobackDoor/Door";
import Link from "next/link";

export default function GoBackDoor() {

    return(
        <Link href="/allpages/books">
        <div className="goback-door">
            <Door />
        </div>
        </Link>
    )
}