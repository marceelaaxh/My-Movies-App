'use client';

import { useRouter } from "next/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type Props = {
  page: number;
  totalPages: number;
  prev: string;
  next: string;
};

const SectionNavigation = ({ page, totalPages, prev, next }: Props) => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center gap-4 mt-10 text-gray-700">
      <button
        onClick={() => router.push(prev)}
        className="disabled:opacity-30 hover:text-black transition"
        disabled={page === 1}
      >
        <ArrowBackIosNewIcon />
      </button>

      <span className="text-sm font-medium">
        Page {page} of {totalPages}
      </span>

      <button
        onClick={() => router.push(next)}
        className="disabled:opacity-30 hover:text-black transition"
        disabled={page === totalPages}
      >
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
};

export default SectionNavigation;