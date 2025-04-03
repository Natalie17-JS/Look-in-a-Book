import Door from "../../profile/profileComponents/GobackDoor/Door";
import Link from "next/link";

export default function GoBackDoor() {

    return (
        <Link href="/">
        <div className="goback-door">
            <Door />
        </div>
        </Link>
    );
}