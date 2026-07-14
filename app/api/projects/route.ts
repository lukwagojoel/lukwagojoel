import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const projectsCol = collection(db, "projects");

export async function GET() {
  try {
    const snap = await getDocs(projectsCol);
    const projects = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unknown" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const ref = await addDoc(projectsCol, body);
    return NextResponse.json({ id: ref.id, ...body });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unknown" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const body = await req.json();
    const ref = doc(db, "projects", id);
    await updateDoc(ref, body);
    return NextResponse.json({ id, ...body });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unknown" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
    const ref = doc(db, "projects", id);
    await deleteDoc(ref);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message ?? "Unknown" }, { status: 500 });
  }
}
