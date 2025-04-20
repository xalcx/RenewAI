import DemoHeader from "../../components/demo/demo-header"
import DemoTabs from "../../components/demo/demo-tabs"

export default function DemoPage() {
  return (
    <>
      <DemoHeader />
      <div className="px-4 sm:px-6 lg:px-8">
        <DemoTabs />
      </div>
    </>
  )
}
