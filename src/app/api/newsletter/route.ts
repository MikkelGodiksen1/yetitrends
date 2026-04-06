import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return Response.json(
        { error: "E-mailadresse er påkrævet." },
        { status: 400 }
      );
    }

    const trimmed = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      return Response.json(
        { error: "Ugyldig e-mailadresse." },
        { status: 400 }
      );
    }

    await db.insert(subscribers).values({ email: trimmed }).onConflictDoNothing();

    return Response.json({ message: "Tak for din tilmelding!" });
  } catch {
    return Response.json(
      { error: "Noget gik galt. Prøv igen senere." },
      { status: 500 }
    );
  }
}
