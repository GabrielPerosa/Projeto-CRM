import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { motion, animate } from "framer-motion";

type CounterProps = {
  target: number;
  label: string;
  suffix?: string;
};

const Counter = ({ target, label, suffix = "" }: CounterProps) => {
  const [value, setValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      animate(0, target, {
        duration: 2,
        onUpdate(value) {
          setValue(Math.floor(value));
        },
      });
    }
  }, [inView, target]);

  return (
    <div ref={ref} className="text-center">
      <motion.p
        className="text-4xl font-bold text-blue-700"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        +{value}
        {suffix}
      </motion.p>
      <p className="text-gray-600 mt-2">{label}</p>
    </div>
  );
};

export default Counter;
