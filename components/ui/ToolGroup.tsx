import type { ToolGroup as ToolGroupType } from "@/data/toolkit";

import { Tag } from "@/components/ui/Tag";

type ToolGroupProps = {

  group: ToolGroupType;

};

export function ToolGroup({ group }: ToolGroupProps) {

  return (

    <article className="border-t border-border py-8">

      <h3 className="text-lg font-semibold text-foreground">

        {group.category}

      </h3>

      <div className="mt-5 flex flex-wrap gap-2">

        {group.tools.map((tool) => (

          <Tag key={tool}>{tool}</Tag>

        ))}

      </div>

    </article>

  );

}