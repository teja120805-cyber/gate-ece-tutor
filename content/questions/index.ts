import type { QuestionDef } from "../types.ts";
import { SS_QUESTIONS } from "./ss.ts";
import { MATH_QUESTIONS } from "./math.ts";
import { NET_QUESTIONS } from "./net.ts";
import { EDC_ANALOG_QUESTIONS } from "./edc-analog.ts";
import { DIG_CTRL_QUESTIONS } from "./dig-ctrl.ts";
import { COMM_EM_GA_QUESTIONS } from "./comm-em-ga.ts";
import { SS2_QUESTIONS } from "./ss2.ts";
import { MATH2_QUESTIONS } from "./math2.ts";
import { NET2_QUESTIONS } from "./net2.ts";
import { EDC2_QUESTIONS } from "./edc2.ts";
import { ANALOG2_QUESTIONS } from "./analog2.ts";
import { DIG2_QUESTIONS } from "./dig2.ts";
import { CTRL2_QUESTIONS } from "./ctrl2.ts";
import { COMM2_QUESTIONS } from "./comm2.ts";
import { EM2_QUESTIONS } from "./em2.ts";
import { GA2_QUESTIONS } from "./ga2.ts";

// All built-in questions are ORIGINAL practice questions written for this app (source "practice").
// Official previous-year questions can be added through Settings → Import question bank, tagged
// source "official-pyq" with a sourceRef, and are labelled as such throughout the app.
export const QUESTIONS: QuestionDef[] = [
  ...SS_QUESTIONS,
  ...MATH_QUESTIONS,
  ...NET_QUESTIONS,
  ...EDC_ANALOG_QUESTIONS,
  ...DIG_CTRL_QUESTIONS,
  ...COMM_EM_GA_QUESTIONS,
  ...SS2_QUESTIONS,
  ...MATH2_QUESTIONS,
  ...NET2_QUESTIONS,
  ...EDC2_QUESTIONS,
  ...ANALOG2_QUESTIONS,
  ...DIG2_QUESTIONS,
  ...CTRL2_QUESTIONS,
  ...COMM2_QUESTIONS,
  ...EM2_QUESTIONS,
  ...GA2_QUESTIONS,
];
