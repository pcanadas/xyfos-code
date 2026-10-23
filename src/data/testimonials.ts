/**
 * Real client testimonials only — the home shows this block when the list is not empty.
 * photo: path under /public (optional).
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
  photo?: string;
}

export const testimonials: Testimonial[] = [];
