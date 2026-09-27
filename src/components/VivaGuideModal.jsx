import React, { useState } from 'react';
import { X, BookOpen, ChevronDown, ChevronUp, CheckCircle, HelpCircle, Code, Cpu } from 'lucide-react';

export default function VivaGuideModal({ onClose }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const vivaQuestions = [
    {
      q: "1. What is a Heuristic Function?",
      a: "A heuristic function H(S) is an educated estimation or evaluation function used in Artificial Intelligence search algorithms to estimate the quality, cost, or distance from a given state S to a target goal state. In this application, H(S) evaluates the total allocation penalty of assigning a vehicle to a specific parking space."
    },
    {
      q: "2. Why is this problem formulated as a Minimization Problem?",
      a: "In optimization problems, a minimization problem aims to minimize penalties, distances, conflicts, and inefficiencies. A score of 0 represents an ideal, penalty-free parking allocation. Therefore, a lower heuristic value indicates a higher-quality, lower-cost allocation."
    },
    {
      q: "3. What is the Hill Climbing algorithm?",
      a: "Hill Climbing is an iterative local search optimization algorithm that starts with an initial candidate solution and incrementally moves to neighboring solutions that improve the objective function value (lower H(S)). It terminates when no neighboring solution yields a lower cost (Local Minimum)."
    },
    {
      q: "4. What does D represent in the heuristic formula H(S) = 5(D) + 100(C) + 20(P) + 10(U)?",
      a: "D represents the Total Walking Distance (in meters) from the selected parking space to the driver's intended destination (e.g., Main Entrance, Elevator/Lift, Academic Block, or Library)."
    },
    {
      q: "5. What does C represent in the heuristic formula?",
      a: "C represents the Number of Parking Conflicts. A conflict occurs if a space is already occupied/reserved or if an incompatible vehicle type is assigned (e.g., parking a large SUV in a compact Bike spot)."
    },
    {
      q: "6. What does P represent in the heuristic formula?",
      a: "P represents the Priority Penalty. High-priority vehicles (e.g., VIP, emergency, disabled access) incur a high penalty P if assigned to far or non-preferred locations, ensuring high-priority vehicles get optimal spots."
    },
    {
      q: "7. What does U represent in the heuristic formula?",
      a: "U represents Parking Space Under-utilization. It penalizes vehicle-size mismatches, such as a small motorbike occupying a large SUV bay, which wastes valuable high-capacity parking capacity."
    },
    {
      q: "8. Why is Parking Conflict (C) assigned the highest weight of 100?",
      a: "Conflict C is a hard constraint (a strict physical/logical rule). Assigning a large multiplier of 100 ensures that the Hill Climbing algorithm immediately rejects invalid or impossible allocations (such as double-parking in an occupied spot) in favor of any valid space, regardless of walking distance."
    },
    {
      q: "9. Why is a lower heuristic value better?",
      a: "Because each term in H(S) represents an unwanted cost or penalty (extra walking distance, rule conflicts, priority dissatisfaction, and wasted space). Minimizing H(S) minimizes total inconvenience and rule violations."
    },
    {
      q: "10. What is a neighboring solution in Hill Climbing?",
      a: "In grid-based space allocation, a neighboring solution S_next is an alternative parking space adjacent in the grid topology or next candidate in the pool. Hill Climbing compares S_current with neighboring spaces to decide whether to transition or stop."
    }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content viva-modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <BookOpen size={24} className="modal-icon text-primary" />
            <div>
              <h3>MCA Practical & Viva Exam Preparation Guide</h3>
              <p>Algorithm & Heuristic Function Breakdown for Examiner Questions</p>
            </div>
          </div>
          <button className="btn-icon-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="viva-hero">
            <div className="viva-formula-card">
              <h4>Objective Function: Minimization Problem</h4>
              <div className="viva-formula">
                H(S) = 5(D) + 100(C) + 20(P) + 10(U)
              </div>
              <p className="viva-formula-sub">
                Lower Heuristic Cost H(S) = Better Quality Allocation State
              </p>
            </div>
          </div>

          <div className="viva-accordion">
            {vivaQuestions.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={index} className={`accordion-item ${isOpen ? 'is-open' : ''}`}>
                  <button className="accordion-header" onClick={() => toggleAccordion(index)}>
                    <span className="question-text">{item.q}</span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {isOpen && (
                    <div className="accordion-body">
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-primary" onClick={onClose}>
            Got it! Ready for Viva
          </button>
        </div>
      </div>
    </div>
  );
}
