import useMyStore from "@/lib/myStore";
import React from "react";
import { useSession } from "next-auth/react"

export default function Section01() {
  
  const { data: session } = useSession()
  const userInfo = {
    firstName:session?.user?.name?.split(" ")[0]
  }

  return (
    <div id="section01" className="min-h-[1330px] border-b p-16">
      <h1 className="text-[40px] mb-8">Introduction to DISC</h1>
      <div>
        Welcome, {userInfo.firstName}, to the beginning of a transformative journey towards self-discovery and personal growth through the lens of the DISC assessment. This comprehensive report has been meticulously crafted to be both accessible and insightful, aiming to illuminate the unique aspects of your personality and behavioral patterns. It&apos;s designed to serve not merely as a document to be perused in a single sitting but as a profound tool for reflection. We encourage you to delve into this report thoughtfully, taking the time to absorb and reflect on the insights it offers about you.<br/><br/>
        The DISC model stands on four pillars: Dominance (D), Influence (I), Steadiness (S), and Conscientiousness (C), each representing different personality traits and behavioral preferences. These components paint a detailed picture of how individuals approach tasks, interact with others, and navigate their environments. Dominance involves assertiveness and a preference for leadership roles. Influence denotes a person’s ability to communicate effectively and persuade. Steadiness reflects a preference for consistency, reliability, and harmony. Conscientiousness highlights a person&apos;s attention to detail, organization, and accuracy.<br/><br/>
        Understanding your DISC profile is invaluable, {userInfo.firstName}. It unlocks the door to improved self-awareness, allowing you to recognize your strengths and areas for development. This knowledge is pivotal in enhancing communication skills, resolving conflicts more effectively, and fostering stronger relationships, both in personal and professional settings. It provides a framework for understanding not just yourself but also the people you interact with, enabling more harmonious and productive relationships.<br/><br/>
        Upon interpreting your DISC assessment results, you&apos;ll gain insights into your preferred communication styles, decision-making processes, and strategies for managing stress. High scores in specific areas underscore your natural inclinations and strengths, while lower scores may illuminate potential areas for growth. These insights are instrumental in navigating your daily life, offering strategies for adapting your communication to connect more effectively with others, leveraging your personal strengths, and identifying opportunities for personal development.<br/><br/>
        Practical application of these insights includes adapting your behavior in various situations to achieve more positive outcomes. Whether it&apos;s in adjusting your communication style to better align with others&apos; preferences or leveraging your dominant traits to lead more effectively, the knowledge gained from your DISC assessment is a powerful tool for personal and professional growth. It underscores the importance of flexibility, continuous learning, and the potential for evolving your behaviors and strategies to meet different challenges.<br/><br/>
        This journey through the DISC assessment also highlights three types of conflict you may encounter: internal conflicts between different facets of your personality, conflicts with others whose DISC styles differ from yours, and conflicts within your work environment when there&apos;s a mismatch between your natural style and job demands. Understanding these conflicts and how your preferences influence them provides a pathway to resolution and harmony.<br/><br/>
        {userInfo.firstName}, as you embark on this journey with the DISC assessment, approach it with an open mind and a proactive attitude towards self-improvement. Let this report be a guide on your path to building stronger relationships and achieving a greater understanding of yourself and those around you. Embrace the insights it provides with enthusiasm and a commitment to personal evolution. Here’s to your journey towards becoming the best version of yourself, both personally and professionally.
      </div>
    </div>
  );
}